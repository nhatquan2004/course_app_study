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
	//chứa cửa sổ modal
	const { modalWindowName, closeModalWindow } = useModalContext();

	const ref = useOutsideClick<HTMLDivElement>(closeModalWindow);

	if (name !== modalWindowName) return null;

	//chèn component mới vào trong document.body
	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div ref={ref} className="relative rounded-xl bg-white p-8 shadow-2xl transition-all">
				<button
					onClick={closeModalWindow}
					className="absolute top-4 right-4 rounded-md p-1 transition-colors hover:bg-gray-100">
					<HiXMark className="h-6 w-6 text-gray-500" />
				</button>

				{/* Component được trả về sẽ nhận được prop onCloseModal, sử dụng cho nút "Hủy" */}
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
