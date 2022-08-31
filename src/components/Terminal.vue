<script setup lang="ts">
import { onMounted } from "vue"
import { Terminal } from 'xterm'
import router from '../router/router'
import interact from 'interactjs'

interface Command {
    name: string
    description: string
    usage: string
    execute: (args: string[]) => void
}

interface Point
{
    x: number
    y: number
}

interface TerminalData {
    username: string
    hostname: string
    currentLine: string
    history: string[]
    selectedHistoryIndex: number
    position: Point
}

let colors = {
    grey: '\x1b[1;30m',
    red: '\x1b[1;31m',
    green: '\x1b[1;32m',
    yellow: '\x1b[1;33m',
    blue: '\x1b[1;34m',
    magenta: '\x1b[1;35m',
    aqua: '\x1b[1;36m',
    white: '\x1b[1;37m',
    reset: '\x1b[0m',
}

let term: Terminal
let data: TerminalData = {
    username: 'user',
    hostname: 'Portfolio',
    currentLine: '',
    history: [],
    selectedHistoryIndex: -1,
    position: {
        x: 0,
        y: 0
    }
}

let shellprompt = `[${data.username}@${data.hostname} ~] `

let commands: Command[] = [
    {
        name: 'hostname',
        description: 'Change the machine\'s name',
        usage: 'hostname <value> : string',
        execute: (args: string[]) =>
        {
            if (!args[0]) return `${colors.red}Error: No hostname specified`
            if (args[0].length <= 16)
            {
                data.hostname = args[0]
                updatePrompt()
                return `${colors.blue}Hostname set to ${colors.magenta}${args[0]}`
            }
            return `${colors.red}Error: hostname too long`
        }
    },
    {
        name: 'username',
        description: 'Change the user\'s name',
        usage: 'username <value> : string',
        execute: (args: string[]) =>
        {
            if (!args[0]) return `${colors.red}Error: No username specified`
            if (args[0].length <= 16)
            {
                data.username = args[0]
                updatePrompt()
                return `${colors.blue}Username set to ${colors.magenta}${args[0]}`
            }
            return `${colors.red}Error: username too long`
        }
    },
    {
        name: 'navigate',
        description: 'Navigate to a different page',
        usage: 'navigate <name> : string',
        execute: (args: string[]) => {
            if (args.length > 0) {
                router.push(args[0])
                return `${colors.blue}Now viewing ${colors.magenta}${args[0]}`
            }
            else {
                return `${colors.red}Error: No page specified`
            }
        }
    },
    {
        name: 'clear',
        description: 'Clear the terminal',
        usage: 'clear',
        execute: (args: string[]) => {
            term.clear()
            return `${colors.green}Cleared the terminal`
        }
    },
    {
        name: 'setanimationspeed',
        description: 'Set the speed of the animation in the background',
        usage: 'setanimationspeed <value> : float',
        execute: (args: string[]) => {
            //@ts-ignore
            if (isNaN(args[0]))
                return `${colors.red}Error: The value must be a float (eg. 0.8)`
                //@ts-ignore
            window.retrowave.setAnimationSpeed(args[0])
            return `${colors.blue}The animation speed has been set to ${colors.magenta}${args[0]}`
        }
    },
    {
        name: 'help',
        description: 'Show this help',
        usage: 'help <command> : string',
        execute: (args: string[]) => {
            let output = ''
            if (args.length) {
                let command = commands.find(c => c.name === args[0])
                if (command)
                    output += `${colors.aqua}${command?.usage}\n\r${colors.reset}${command?.description}`
                else
                    output += `${colors.red}Error: The command ${colors.aqua}${args[0]}${colors.red} doesn't exist`
            }
            else {
                output = `${colors.green}Available commands:\n\r`
                commands.forEach(c => {
                    output += `${colors.blue}${c.name}${colors.reset}\n\r${c.description}\n\r\n`
                })
            }
            return output.substring(0, output.length - 2)
        }
    },
]

function printWelcomeMessage(term: Terminal) {
    term.write(colors.blue)
    term.writeln("  __    __        _                               ")
    term.writeln(" / / /\\ \\ \\  ___ | |  ___   ___   _ __ ___    ___ ")
    term.writeln(" \\ \\/  \\/ / / _ \\| | / __| / _ \\ | '_ \\` _ \\ / _ \\")
    term.writeln("  \\  /\\  / |  __/| || (__ | (_) || | | | | ||  __/")
    term.writeln("   \\/  \\/   \\___||_| \\___| \\___/ |_| |_| |_| \\___|")
    term.writeln("                                                  ")
    term.writeln(`          Type ${colors.red}help${colors.blue} for a list of commands ${colors.reset}\n\r`)
}

function updatePrompt()
{
    shellprompt = `[${data.username}@${data.hostname} ~] `
}

onMounted(() => {
    term = new Terminal({
        cols: 60,
        rows: 24,
        fontFamily: 'Hack',
        fontSize: 14,
        allowTransparency: true,
        theme: {
            background: '#0008'
        },
        cursorBlink: true,
        cursorStyle: 'underline',
        windowsMode: false,
        scrollSensitivity: 0.8,
    })
    term.open(document.querySelector('#shell') as HTMLElement)
    printWelcomeMessage(term)
    term.write(shellprompt)
    term.onData(char => {
        if (char.match('[A-Za-z0-9-. ]+')) { /* allow letters, digits, spaces and dashes and periods */
            //todo: implement history
            if (char == '\u001b[A' || char == '\u001b[B' || char == '\u001b[C' || char == '\u001b[D') // disable arrow keys
                return
            data.currentLine += char
            term.write(char)
        }
    })

    term.onKey(event => {
        if (event.key == '\u007f') { /* delete key */
            data.currentLine = data.currentLine.substring(0, data.currentLine.length - 1)
            term.write('\x1b[2K\r' + shellprompt + data.currentLine)
        }
        else if (event.key == '\r') { /* enter key */
            if (data.currentLine == '')
                return
            data.history.push(data.currentLine)
            let args = data.currentLine.split(' ')
            let cmd = args.shift()
            term.write('\r\n')
            let output = commands.find(c => c.name === cmd)?.execute(args)
            if (output)
                term.write(output)
            else
                term.write(`${colors.red}Command not found, type ${colors.aqua}help${colors.red} for a list of commands`)
            data.currentLine = ''
            term.write(colors.reset + '\r\n' + shellprompt)
            return
        }
    })

    interact('.terminal-wrapper').draggable({
        allowFrom: '.drag-handle',
        listeners: {
            move(ev) {
                data.position.x += ev.dx
                data.position.y += ev.dy
                ev.target.style.transform = `translate(${data.position.x}px, ${data.position.y}px)`
            }
        }
    })
})

</script>

<template>
    <div class="terminal-wrapper">
    <div class="drag-handle"></div>
        <div id="shell"></div>
    </div>
</template>

<style scoped>
.terminal-wrapper {
    position: absolute;
    bottom: 2%;
    right: 1%;
    border: 2px solid #e443de;
    border-radius: 5px;
    width: max-content;
    height: max-content;
    backdrop-filter: blur(3px);
}

.drag-handle
{
    background: #e443de;
    width: 100%;
    height: 8px;
}

#shell {
    width: max-content;
    height: max-content;
}

</style>

