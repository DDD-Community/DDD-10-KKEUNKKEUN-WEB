import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  toggleButton: ReactNode;
  children: ReactNode;
}

const Flyout = ({ toggleButton, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeModal = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', closeModal);
    return () => {
      window.removeEventListener('mousedown', closeModal);
    };
  }, []);

  return (
    <div ref={ref}>
      {/* 메뉴 모달 토글 버튼 */}
      {!isOpen && <div onClick={() => setIsOpen((prev) => !prev)}>{toggleButton}</div>}
      {/* 수정 삭제 버튼 */}
      {isOpen && children}
    </div>
  );
};

export default Flyout;
