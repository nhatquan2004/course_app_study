import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import useOutsideClick from '../hooks/useOutsideClick';

interface ModalContextType {
	modalWindowName: string;
	openModalWindow: (name: string) => void;
	closeModalWindow: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

function useModalContext() {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error('Modal components must be used inside Modal.');
	}

	return context;
}

interface ModalProps {
	children: ReactNode;
}

interface OpenProps {
	openWindowName: string;
	children: ReactElement<{ onClick?: () => void }>;
}

interface WindowProps {
	name: string;
	children: ReactElement<{ onCloseModal?: () => void }>;
}

type ModalComponent = React.FC<ModalProps> & {
	Open: typeof Open;
	Window: typeof Window;
};

const Modal = (({ children }: ModalProps) => {
	//Context Provider: quản lý state với tên modal được mở
	const [modalWindowName, setModalWindowName] = useState('');

	const closeModalWindow = () => setModalWindowName('');
	const openModalWindow = (name: string) => setModalWindowName(name);

	return (
		//Truyền state với function xuống cho lớp con
		<ModalContext.Provider value={{ modalWindowName, openModalWindow, closeModalWindow }}>
			{children}
		</ModalContext.Provider>
	);
}) as ModalComponent;

function Open({ children, openWindowName }: OpenProps) {
	//lấy function từ context
	const { openModalWindow } = useModalContext();

	//trả về element con, gắn luôn cho nó chức năng onClick là mở modal
	return cloneElement(children, {
		onClick: () => {
			children.props.onClick?.();
			openModalWindow(openWindowName);
		},
	});
}

function Window({ children, name }: WindowProps) {
	const { modalWindowName, closeModalWindow } = useModalContext();

	const ref = useOutsideClick<HTMLDivElement>(closeModalWindow);

	if (name !== modalWindowName) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/50 backdrop-blur-md px-4">
			<div ref={ref} className="relative rounded-[24px] border border-[var(--color-rule)] bg-white p-8 shadow-2xl transition-all max-w-lg w-full">
				<button
					onClick={closeModalWindow}
					style={{ right: '1.5rem', top: '1.25rem' }}
					className="absolute btn-push btn-push-soft !p-1.5 !w-8 !h-8 text-[var(--color-muted)] flex items-center justify-center"
				>
					<HiXMark className="h-5 w-5" />
				</button>

				{cloneElement(children, {
					onCloseModal: closeModalWindow,
				})}
			</div>
		</div>,
		document.body,
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
