"use client";
import React, { useEffect, useState } from "react";

import { MdWarning, MdEdit } from "react-icons/md";
import { PiSmileyBold, PiSmileyMehBold } from "react-icons/pi";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "@/store";
import { firestore } from "@/firebase";
import { FieldValues, useForm } from "react-hook-form";
import { DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

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
  const [inputingAmount, setInputingAmount] = useState<number | null>(null);
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const modifyMoney = async (data: FieldValues) => {
    const date = new Date();
    if (!user) return;
    if (modify.type === "delete") {
      await deleteDoc(
        doc(firestore, "users", user.id, "moneys", modify.money.id)
      );
    }

    if (modify.type === "edit") {
      if ((inputingAmount as number) === modify.money.amount || !inputingAmount)
        await updateDoc(
          doc(firestore, "users", user.id, "moneys", modify.money.id),
          {
            amount: modify.money.amount,
            source:
              data.source.trim() === "" ? modify.money.source : data.source,
            category:
              data.category.trim() === ""
                ? modify.money.category
                : data.category,
            reasons: modify.money.reasons
              ? [
                  ...modify.money.reasons,
                  {
                    reason: data.reason,
                    createdAt: date.toLocaleDateString(),
                    dateNow: Date.now(),
                    difference: "nothing",
                  },
                ]
              : [
                  {
                    reason: data.reason,
                    createdAt: date.toLocaleDateString(),
                    dateNow: Date.now(),
                    difference: "nothing",
                  },
                ],
          }
        );
      else
        await updateDoc(
          doc(firestore, "users", user.id, "moneys", modify.money.id),
          {
            amount: data.amount,
            source:
              data.source.trim() === "" ? modify.money.source : data.source,
            category:
              data.category.trim() === ""
                ? modify.money.category
                : data.category,
            reasons: modify.money.reasons
              ? [
                  ...modify.money.reasons,
                  {
                    reason: data.reason,
                    createdAt: date.toLocaleDateString(),
                    dateNow: Date.now(),
                    difference:
                      (inputingAmount as number) > modify.money.amount
                        ? "increased"
                        : "decreased",
                  },
                ]
              : [
                  {
                    reason: data.reason,
                    createdAt: date.toLocaleDateString(),
                    dateNow: Date.now(),
                    difference:
                      (inputingAmount as number) > modify.money.amount
                        ? "increased"
                        : "decreased",
                  },
                ],
          }
        );
    }

    reset();
    setInputingAmount(null);
    onOpenChange();
  };
  useEffect(() => {
    reset();
    setInputingAmount(null);
  }, [modify.money.id]);
  return (
    <Modal
      backdrop="transparent"
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        setInputingAmount(null);
        reset();
      }}
      radius="lg"
      className={`${theme.theme} bg-gradient-to-b from-transparent to-primary/10`}
      placement="bottom"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(modifyMoney)}>
            <ModalHeader className="flex flex-col gap-1">
              <p
                className={`text-lg sm:text-xl font-bold flex items-center gap-1 ${
                  modify.type === "delete" ? "text-danger" : "text-warning"
                }`}
              >
                {modify.type === "delete" ? (
                  <>
                    Are you sure to delete? <MdWarning />
                  </>
                ) : (
                  <>
                    Editing...
                    <MdEdit />
                  </>
                )}
              </p>
            </ModalHeader>
            {modify.type === "edit" && (
              <ModalBody className="text-foreground">
                <Input
                  {...register("source", { required: false })}
                  label="Source"
                  autoComplete="off"
                  placeholder={modify && modify.money.source}
                  variant="bordered"
                  color="primary"
                  autoFocus
                />
                <Input
                  {...register("category", { required: false })}
                  label="Category"
                  autoComplete="off"
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
                    onChange(event) {
                      if (event.target.value === "")
                        return setInputingAmount(null);
                      setInputingAmount(event.target.value);
                    },
                  })}
                  autoComplete="off"
                  label="Amount"
                  placeholder={modify && modify.money.amount}
                  variant="bordered"
                  color="primary"
                />
                {errors.amount ? (
                  <p className="text-xs text-danger">{`${errors.amount.message}`}</p>
                ) : (
                  inputingAmount &&
                  inputingAmount != modify.money.amount && (
                    <>
                      <div className="flex items-center gap-1 text-xs">
                        {inputingAmount > modify.money.amount ? (
                          <>
                            <span className="text-success text-xl">
                              <PiSmileyBold />
                            </span>
                            <p className="text-success">
                              Yay! The amount increased, Why?
                            </p>
                          </>
                        ) : (
                          <>
                            <span className="text-warning text-xl">
                              <PiSmileyMehBold />
                            </span>
                            <p className="text-warning">
                              Hmm! The amount decreased, Why?
                            </p>
                          </>
                        )}
                      </div>

                      <Input
                        {...register("reason", {
                          required: "Please state your reason!",
                          minLength: {
                            value: 4,
                            message: "At least 4 characters, please.",
                          },
                        })}
                        label="Reason"
                        placeholder={"e.g. bought snacks from 7/11"}
                        variant="bordered"
                        color="primary"
                      />
                      {errors.reason && (
                        <p className="text-xs text-danger">{`${errors.reason.message}`}</p>
                      )}
                    </>
                  )
                )}
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
                  CANCEL
                </Button>
              )}
              <Button
                isDisabled={isSubmitting}
                type="submit"
                color={modify.type === "delete" ? "danger" : "warning"}
                variant="shadow"
                className={`text-xs font-bold text-white`}
              >
                {modify.type === "delete" ? (
                  <> {isSubmitting ? "DELETING..." : "YES"}</>
                ) : (
                  <>{isSubmitting ? "EDITING..." : "CONFIRM EDIT"}</>
                )}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
