import { useContext } from "react"
import { ActiveBook } from "../context/context"

export function useActiveBook() {
    const activeBook = useContext(ActiveBook)
    if(!activeBook) {
        throw new Error('useActiveBook must be used with ActiveBookContext')
    } else {
        return activeBook
    }
}