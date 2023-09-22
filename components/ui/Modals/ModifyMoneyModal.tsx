"use client";
import React from "react";
import { useTheme } from "@/store";
import { firestore } from "@/firebase";
import { FieldValues, useForm } from "react-hook-form";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

type AddMoney = {
  isOpen: boolean;
  onOpenChange: () => void;
  modify: { type: "edit" | "delete"; money: DocumentData };
};

export default function ModifyMoneyModal({
  isOpen,
  onOpenChange,
  modify,
}: AddMoney) {
  const { user } = useUser();
  const theme = useTheme();
  const {
    register,
    setError,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm();
  const modifyMoney = async (data: FieldValues) => {
    if (!user) return;
    if (modify.type === "delete") {
      await deleteDoc(
        doc(firestore, "users", user.id, "moneys", modify.money.id)
      );
    }

    if (modify.type === "edit") {
      await updateDoc(
        doc(firestore, "users", user.id, "moneys", modify.money.id),
        {
          amount: data.amount.trim() === "" ? modify.money.amount : data.amount,
          source: data.source.trim() === "" ? modify.money.source : data.source,
          category:
            data.category.trim() === "" ? modify.money.category : data.category,
        }
      );
    }

    reset();
    onOpenChange();
  };
  return (
    <Modal
      backdrop="transparent"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      className={`${theme.theme} bg-gradient-to-b from-transparent to-primary/10`}
      placement="bottom"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(modifyMoney)}>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                <span
                  className={`${
                    modify.type === "delete" ? "text-danger" : "text-warning"
                  }`}
                >
                  {modify.type.toUpperCase()}?
                </span>
              </h1>
            </ModalHeader>
            {modify.type === "edit" && (
              <ModalBody className="text-foreground">
                <Input
                  {...register("source", { required: false })}
                  label="Amount"
                  placeholder={modify && modify.money.source}
                  variant="bordered"
                  color="primary"
                />

                <Input
                  {...register("category", { required: false })}
                  label="Category"
                  placeholder={
                    modify && modify.money.category.trim() === ""
                      ? "Uncategorized"
                      : modify.money.category
                  }
                  variant="bordered"
                  color="primary"
                />
                <Input
                  {...register("amount", {
                    pattern: {
                      value: /^[0-9,.]+$/,
                      message: "Numericals Only.",
                    },
                  })}
                  label="Amount"
                  placeholder={modify && modify.money.amount}
                  variant="bordered"
                  color="primary"
                />
              </ModalBody>
            )}
            <ModalFooter>
              {!isSubmitting && (
                <Button
                  isDisabled={isSubmitting}
                  onPress={onClose}
                  color="default"
                  variant="shadow"
                  className={`text-xs font-bold text-white`}
                >
                  CLOSE
                </Button>
              )}
              {modify.type === "delete" ? (
                <Button
                  isDisabled={isSubmitting}
                  type="submit"
                  color="warning"
                  variant="shadow"
                  className={`text-xs font-bold text-white`}
                >
                  {isSubmitting ? "DELETING..." : "CONFIRM DELETE"}
                </Button>
              ) : (
                <Button
                  isDisabled={isSubmitting}
                  type="submit"
                  color="warning"
                  variant="shadow"
                  className={`text-xs font-bold text-white`}
                >
                  {isSubmitting ? "EDITING..." : "CONFIRM EDIT"}
                </Button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
