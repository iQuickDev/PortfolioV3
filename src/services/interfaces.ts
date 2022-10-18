export interface Command {
    name: string
    description: string
    usage: string
    execute: (args: string[]) => void
}

export interface Point {
    x: number
    y: number
}

export interface TerminalData {
    username: string
    hostname: string
    shellprompt: string
    currentLine: string
    isVisible: boolean
    history: string[]
    selectedHistoryIndex: number
    position: Point
}

export interface Song {
    title: string
    author: string
    id: string
    duration: number
}

declare global {
    interface Window {
        isHacked: boolean
        retrowave: any
    }
}
