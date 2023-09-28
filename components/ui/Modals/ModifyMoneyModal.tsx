"use client";
import React, { useEffect, useState } from "react";

import { MdWarning, MdEdit } from "react-icons/md";
import { PiSmileyBold, PiSmileyMehBold } from "react-icons/pi";
import { useUser } from "@clerk/nextjs";
import { useMoneys, useTheme } from "@/store";
import { firestore } from "@/firebase";
import { FieldValues, useForm } from "react-hook-form";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
  ButtonGroup,
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
  const [amountAction, setAmountAction] = useState<
    "deduct" | "add" | "new" | null
  >(null);
  const moneyState = useMoneys();
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
      const data = await getDoc(
        doc(firestore, "users", user.id, "moneys", modify.money.id)
      );
      if (data.exists()) {
        moneyState.writeHistory(
          Number(moneyState.total) - Number(data.data().amount),
          user.id,
          -data.data().amount,
          data.data().source,
          "decreased"
        );
        await deleteDoc(
          doc(firestore, "users", user.id, "moneys", modify.money.id)
        );
      }
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
        switch (amountAction) {
          case "add":
            await updateDoc(
              doc(firestore, "users", user.id, "moneys", modify.money.id),
              {
                amount: Number(modify.money.amount) + Number(data.amount),
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
                        difference: "increased",
                      },
                    ]
                  : [
                      {
                        reason: data.reason,
                        createdAt: date.toLocaleDateString(),
                        dateNow: Date.now(),
                        difference: "increased",
                      },
                    ],
              }
            );
            moneyState.writeHistory(
              Number(moneyState.total) + Number(data.amount),
              user.id,
              data.amount,
              data.source.trim() === "" ? modify.money.source : data.source,
              "increased"
            );

            break;
          case "deduct":
            await updateDoc(
              doc(firestore, "users", user.id, "moneys", modify.money.id),
              {
                amount: Number(modify.money.amount) - Number(data.amount),
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
                        difference: "decreased",
                      },
                    ]
                  : [
                      {
                        reason: data.reason,
                        createdAt: date.toLocaleDateString(),
                        dateNow: Date.now(),
                        difference: "decreased",
                      },
                    ],
              }
            );
            moneyState.writeHistory(
              Number(moneyState.total) - Number(data.amount),
              user.id,
              -data.amount,
              data.source.trim() === "" ? modify.money.source : data.source,
              "decreased"
            );

            break;
          case "new":
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
                          Number(inputingAmount) > Number(modify.money.amount)
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
                          Number(inputingAmount) > Number(modify.money.amount)
                            ? "increased"
                            : "decreased",
                      },
                    ],
              }
            );
            if (Number(inputingAmount) > Number(modify.money.amount)) {
              moneyState.writeHistory(
                Number(moneyState.total) +
                  (Number(data.amount) - Number(modify.money.amount)),
                user.id,
                data.amount,
                data.source.trim() === "" ? modify.money.source : data.source,
                "increased"
              );
            } else {
              moneyState.writeHistory(
                Number(moneyState.total) -
                  (Number(modify.money.amount) - Number(data.amount)),
                user.id,
                -data.amount,
                data.source.trim() === "" ? modify.money.source : data.source,
                "decreased"
              );
            }

            break;
        }
      await addDoc(collection(firestore, "users", user.id, "analytics"), {
        amount: data.amount,
        source: data.source,
        category: data.category,
        createdAt: date.toLocaleDateString(),
        dateNow: Date.now(),
      });
    }

    reset();
    setInputingAmount(null);
    setAmountAction(null);
    onOpenChange();
  };
  useEffect(() => {
    reset();
    setAmountAction(null);
    setInputingAmount(null);
  }, [modify.money.id]);
  return (
    <Modal
      backdrop="transparent"
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        setInputingAmount(null);
        setAmountAction(null);
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
                <p className="text-xs text-warning">
                  Select action for the amount.
                </p>
                <ButtonGroup className="flex flex-row gap-1">
                  <Button
                    color={amountAction === "deduct" ? "danger" : "default"}
                    variant="shadow"
                    onClick={() => setAmountAction("deduct")}
                    className={`text-xs font-bold text-white flex-1`}
                  >
                    DEDUCT
                  </Button>
                  <Button
                    color={amountAction === "add" ? "success" : "default"}
                    variant="shadow"
                    onClick={() => setAmountAction("add")}
                    className={`text-xs font-bold text-white flex-1`}
                  >
                    ADD
                  </Button>
                  <Button
                    color={amountAction === "new" ? "warning" : "default"}
                    variant="shadow"
                    onClick={() => setAmountAction("new")}
                    className={`text-xs font-bold text-white flex-1`}
                  >
                    NEW AMOUNT
                  </Button>
                </ButtonGroup>
                {amountAction && (
                  <>
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
                      label={amountAction + " amount"}
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
                          {amountAction === "new" && (
                            <div className="flex items-center gap-1 text-xs">
                              {Number(inputingAmount) >
                              Number(modify.money.amount) ? (
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
                          )}

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
                    {amountAction === "new" && (
                      <p className="text-xs text-warning">
                        Note: Your amount input will become the new amount.
                      </p>
                    )}
                    {amountAction === "add" && (
                      <p className="text-xs text-warning">
                        Note: Your amount input will added to the current
                        amount.
                      </p>
                    )}
                    {amountAction === "deduct" && (
                      <p className="text-xs text-warning">
                        Note: Your amount input will deducted to the current
                        amount.
                      </p>
                    )}
                  </>
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
