<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Terminal } from 'xterm'
import router from '../router/router'
import interact from 'interactjs'
import { TerminalData, Command } from '../services/interfaces'
import { gsap } from 'gsap'

let term: Terminal

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

let data: TerminalData = {
    username: 'user',
    hostname: 'Portfolio',
    shellprompt: '',
    currentLine: '',
    isVisible: false,
    history: [],
    selectedHistoryIndex: -1,
    position: {
        x: 0,
        y: 0
    }
}

data.shellprompt = `[${data.username}@${data.hostname} ~] `

let commands: Command[] = [
    {
        name: 'hostname',
        description: 'Change the machine\'s name',
        usage: 'hostname <value> : string',
        execute: (args: string[]) => {
            if (!args[0]) return `${colors.red}Error: No hostname specified`
            if (args[0].length <= 16) {
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
        execute: (args: string[]) => {
            if (!args[0]) return `${colors.red}Error: No username specified`
            if (args[0].length <= 16) {
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
        name: 'hack',
        description: 'Hack the page by allowing you to edit all the text',
        usage: 'hack',
        execute: (args: string[]) => {
            if ((document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display == 'block')
            return `${colors.red}Error: The page has been hacked already`

            let allElements = document.querySelectorAll('*')

            for (const element of allElements) {
                element.setAttribute('contenteditable', 'true')
                element.setAttribute('spellcheck', 'false')
            }

            (document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'block';
            setTimeout(() => {
                (document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '.5';
            }, 100)

            return `${colors.blue}Successfully hacked the page`
        }
    },
    {
        name: 'unhack',
        description: 'Removes any traces of hacking',
        usage: 'unhack',
        execute: (args: string[]) => {
            if ((document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display == 'none')
            return `${colors.red}Error: The page has not been hacked (yet)`

            let allElements = document.querySelectorAll('*')

            for (const element of allElements) {
                element.setAttribute('contenteditable', 'false')
            }

            (document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '0';

            setTimeout(() => {
                (document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'none';
            }, 1000);

            return `${colors.blue}Page unhacked, the cops won't be after you anymore`
        }
    },
    {
        name: 'history',
        description: 'View commands history',
        usage: 'history',
        execute: (args: string[]) => {
            if (data.history.length == 1)
                return `${colors.red}The commands history is empty`

            let output = ''

            for (let i = 0; i < data.history.length - 1; i++) {
                output += `${i + 1}. ${data.history[i]}\n\r`
            }

            return output
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

                output = output.substring(0, output.length - 2)
            }
            return output
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

function updatePrompt() {
    data.shellprompt = `[${data.username}@${data.hostname} ~] `
}

function toggleTerminal() {
    let terminal = document.querySelector('.terminal-wrapper') as HTMLElement
    let hint = document.querySelector('.terminal-hint') as HTMLElement

    if (data.isVisible) {
        gsap.fromTo(terminal, {
            opacity: 1,
            x: 0
        },
            {
                duration: .75,
                ease: "back.out(1.7)",
                opacity: 0,
                x: +300,
                display: 'none'
            })

        gsap.fromTo(hint, {
            opacity: 0,
            x: +300
        },
            {
                duration: .75,
                ease: "back.out(1.7)",
                opacity: 1,
                x: 0,
                display: 'block'
            })
    }
    else {
        gsap.fromTo(terminal, {
            opacity: 0,
            x: +300
        },
            {
                duration: .75,
                ease: "back.out(1.7)",
                opacity: 1,
                x: 0,
                display: 'block'
            })

        gsap.fromTo(hint, {
            opacity: 1,
            x: 0
        },
            {
                duration: .75,
                ease: "back.out(1.7)",
                opacity: 0,
                x: +300,
                display: 'none'
            })
    }
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
        scrollSensitivity: 2,
    })
    term.open(document.querySelector('#shell') as HTMLElement)
    printWelcomeMessage(term)
    term.write(data.shellprompt)
    term.onData(char => {
        if (char.match('[A-Za-z0-9-. ]+')) { /* allow letters, digits, spaces and dashes and periods */
            if (char == '\u001b[A' || char == '\u001b[B' || char == '\u001b[C' || char == '\u001b[D') // disable arrow keys
                return
            data.currentLine += char
            term.write(char)
        }
    })

    term.onKey(event => {
        switch (event.key) {
            case '\u007f': /* delete key */
                data.currentLine = data.currentLine.substring(0, data.currentLine.length - 1)
                term.write('\x1b[2K\r' + data.shellprompt + data.currentLine) // \x1b[2K\r -> deletion character
                break
            case '\r': /* enter key */
                if (data.currentLine == '')
                    break
                data.history.push(data.currentLine)
                data.selectedHistoryIndex = data.history.length
                let args = data.currentLine.split(' ')
                let cmd = args.shift()
                term.write('\r\n')
                let output = commands.find(c => c.name === cmd)?.execute(args)
                if (output)
                    term.write(output)
                else
                    term.write(`${colors.red}Command not found, type ${colors.aqua}help${colors.red} for a list of commands`)
                data.currentLine = ''
                term.write(colors.reset + '\r\n' + data.shellprompt)
                break
            case '\u001b[A': /* arrow up */
                if (data.selectedHistoryIndex > 0) {
                    data.selectedHistoryIndex -= 1
                    data.currentLine = data.history[data.selectedHistoryIndex]
                    term.write('\x1b[2K\r' + data.shellprompt + data.currentLine)
                }
                break
            case '\u001b[B': /* arrow down */
                if (data.selectedHistoryIndex < data.history.length - 1) {
                    data.selectedHistoryIndex += 1
                    data.currentLine = data.history[data.selectedHistoryIndex]
                    term.write('\x1b[2K\r' + data.shellprompt + data.currentLine)
                }
                break
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

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() == 't') {
            toggleTerminal()
            data.isVisible = !data.isVisible
            if (data.isVisible) {
                setTimeout(() => {
                    term.focus()
                }, 100)
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

    <div class="terminal-hint">
        <h4>Press [T] to toggle the Terminal</h4>
    </div>
</template>

<style>
.terminal-hint {
    position: absolute;
    bottom: 2%;
    right: 1%;
    background: #0005;
    width: max-content;
    padding: 5px;
    border-radius: 5px;
    backdrop-filter: blur(3px);
    transition: .5s;
}

.terminal-wrapper {
    position: absolute;
    bottom: 2%;
    right: 1%;
    border: 2px solid #e443de;
    border-radius: 5px;
    width: max-content;
    height: max-content;
    backdrop-filter: blur(3px);
    opacity: 0;
    display: none;
}

.drag-handle {
    background: #e443de;
    width: 100%;
    height: 8px;
}

#shell {
    width: max-content;
    height: max-content;
}

.xterm-viewport {
    scroll-behavior: smooth;
}

.xterm-viewport::-webkit-scrollbar {
    display: none !important;
}

@media screen and (max-width: 1300px) {
    .terminal-wrapper {
        transform: scale(0.9);
        bottom: 0;
        right: 0;
    }
}

@media screen and (max-width: 600px) {
    .terminal-wrapper {
        display: none;
    }

    .terminal-hint {
        display: none;
    }
}
</style>

