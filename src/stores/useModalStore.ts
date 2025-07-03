import { create } from "zustand"
import type { VendorId } from "@/lib/vendors/data"

interface ModalState {
  vendorId: VendorId | null
  isOpen: boolean
  openModal: (vendorId: VendorId) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  vendorId: null,
  isOpen: false,
  openModal: (vendorId) => set({ isOpen: true, vendorId }),
  closeModal: () => set({ isOpen: false, vendorId: null }),
}))
