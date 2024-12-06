import { createPortal } from "react-dom"

export const Portal: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({
  isOpen,
  children,
}: {
  isOpen: boolean
  children: React.ReactNode
}) => {
  return isOpen ? createPortal(children, document.body) : null
}
