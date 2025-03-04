import { useContext } from "react"
import { ActivePage } from "../context/context"

export function useActivePage() {
    const activePage = useContext(ActivePage)
    if(!activePage) {
        throw new Error('useActivePage must be used with ActiveBookContext')
    } else {
        return activePage
    }
}