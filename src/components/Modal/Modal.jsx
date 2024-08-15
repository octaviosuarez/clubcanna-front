import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const Modal = ({isOpen}) => {


  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-black gap-1">
                Alta de Producto
              </ModalHeader>
              <ModalBody>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
