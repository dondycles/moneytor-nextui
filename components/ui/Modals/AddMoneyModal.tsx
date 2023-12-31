"use client";

import { useUser } from "@clerk/nextjs";
import { useTheme } from "@/store";
import { firestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { FieldValues, useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useWriteMoneyHistory } from "@/lib/hooks/writeMoneyHistory";
import { montserrat } from "@/components/provider/nextUi";

type AddMoney = {
  isOpen: boolean;
  onOpenChange: () => void;
  total: number;
};

export default function AddMoneyModal({
  isOpen,
  onOpenChange,
  total,
}: AddMoney) {
  const { user } = useUser();

  const date = new Date();
  const theme = useTheme();

  const {
    register,
    setError,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm();

  const addMoney = async (data: FieldValues) => {
    if (!user) return;
    if (data.source.trim() === "")
      return setError("source", { message: "A source name is required." });
    await addDoc(collection(firestore, "users", user.id, "moneys"), {
      amount: data.amount,
      source: data.source,
      category: data.category.trim() === "" ? "uncategorized" : data.category,
      createdAt: date.toLocaleDateString(),
      dateNow: Date.now(),
    });

    useWriteMoneyHistory({
      total: Number(total) + Number(data.amount),
      userId: user.id,
      insertedAmount: data.amount,
      source: data.source,
      difference: "increased",
    });

    reset();
    onOpenChange();
  };

  return (
    <Modal
      backdrop="transparent"
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        reset();
      }}
      radius="lg"
      className={`${theme.theme} bg-gradient-to-b from-transparent to-primary/10 ${montserrat.className}`}
      placement="bottom"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(addMoney)}>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                Add Money
              </h1>
            </ModalHeader>
            <ModalBody className="text-foreground">
              <Input
                {...register("source", {
                  required: "A source name is required.",
                })}
                label='Source e.g. "Gcash"'
                variant="bordered"
                color="primary"
              />
              {errors.source && (
                <p className="text-xs text-danger">{`${errors.source.message}`}</p>
              )}
              <Input
                {...register("category")}
                label='Category e.g. "Allowance" (Optional)'
                variant="bordered"
                color="primary"
              />
              <Input
                {...register("amount", {
                  pattern: { value: /^[0-9,.]+$/, message: "Numericals Only." },
                })}
                label="Amount"
                variant="bordered"
                color="primary"
              />
              {errors.amount && (
                <p className="text-xs text-danger">{`${errors.amount.message}`}</p>
              )}
            </ModalBody>
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

              <Button
                isDisabled={isSubmitting}
                type="submit"
                color="primary"
                variant="shadow"
                className={`text-xs font-bold text-white`}
              >
                {isSubmitting ? "ADDING..." : "ADD"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
