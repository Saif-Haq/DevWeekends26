import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as yup from "yup"
import { Button } from "@base-ui/react/button"

const billAmountSchema = yup
  .number()
  .typeError("Bill amount is required")
  .required("Bill amount is required")
  .min(0, "Bill amount must be at least 0")

const tipPercentageSchema = yup
  .number()
  .typeError("Tip percentage is required")
  .required("Tip percentage is required")
  .min(0, "Tip percentage must be at least 0")
  .max(100, "Tip percentage must be less than 100")

function validateBillAmount(value: string): string | null {
  if (value === "") return "Required"
  try {
    billAmountSchema.validateSync(Number(value))
    return null
  } catch (error) {
    return error instanceof yup.ValidationError
      ? error.message
      : "Invalid bill amount"
  }
}

function validateTipPercentage(value: string): string | null {
  if (value === "") return "Required"
  try {
    tipPercentageSchema.validateSync(Number(value))
    return null
  } catch (error) {
    return error instanceof yup.ValidationError
      ? error.message
      : "Invalid tip percentage"
  }
}

const peopleCountSchema = yup
  .number()
  .typeError("Number of people is required")
  .required("Number of people is required")
  .min(1, "Number of people must be at least 1")
  .integer("Number of people must be a whole number")

function validatePeopleCount(value: string): string | null {
  if (value === "") return "Required"
  try {
    peopleCountSchema.validateSync(Number(value))
    return null
  } catch (error) {
    return error instanceof yup.ValidationError
      ? error.message
      : "Invalid number of people"
  }
}

export function CardMain() {
  const [billAmount, setBillAmount] = useState("")
  const [billError, setBillError] = useState<string | null>(null)
  const [tipPercentage, setTipPercentage] = useState("")
  const [tipPercentageError, setTipPercentageError] = useState<string | null>(null)
  const [peopleCount, setPeopleCount] = useState("")
  const [peopleCountError, setPeopleCountError] = useState<string | null>(null)

  const hasErrors =
    billError ||
    tipPercentageError ||
    peopleCountError

  const bill = Number(billAmount)
  const tip = Number(tipPercentage)
  const people = Number(peopleCount)

  const tipAmount = bill * (tip / 100)
  const totalAmount = (bill + tipAmount)
  const perPersonAmount = Number(totalAmount / people).toFixed(2);

  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="z-50 relative w-4xl rounded-4xl ">
      <CardHeader className="text-center">
        <CardTitle className="vt323-regular">Welcome To Batvaara</CardTitle>
        <CardDescription className="vt323-regular">
          Enter details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="bill-amount" aria-invalid={billError ? true : undefined}
              >Bill Amount (PKR)</Label>
              <Input
                id="bill-amount"
                type="number"
                placeholder="PKR 100"
                required
                  aria-invalid={billError ? true : undefined}
                inputMode="numeric"
                value={billAmount}
                onChange={(e) => {
                  const value = e.target.value
                  setBillAmount(value)
                  setBillError(validateBillAmount(value))
                }}
              />
              {billError ? (
                <p className="text-sm text-destructive">{billError}</p>
              ) : null}
            </div>


            <div className="grid gap-2">
                <div className="flex flex-row gap-2">

                  <div className="w-full">
                    <Label htmlFor="tip-percentage" aria-invalid={billError ? true : undefined}
                    >Tip Percentage (%)</Label>
                    <Input
                      id="tip-percentage"
                      type="number"
                      placeholder="10"
                      required
                      aria-invalid={tipPercentageError ? true : undefined}
                      inputMode="numeric"
                      value={tipPercentage}
                      onChange={(e) => {
                        const value = e.target.value
                        setTipPercentage(value)
                        setTipPercentageError(validateTipPercentage(value))
                      }}
                    />
                    {tipPercentageError ? (
                      <p className="text-sm text-destructive">{tipPercentageError}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-row gap-2">
                    <Button type="button"
                      onClick={() => setTipPercentage("10")} className="w-full bg-black text-white p-2">10%</Button>
                    <Button type="button" onClick={() => { setTipPercentage("15") }} className="w-full bg-black text-white p-2">15%</Button>
                    <Button type="button" onClick={() => setTipPercentage("20")} className="w-full bg-black text-white p-2">20%</Button>
                  </div>

                </div>
              </div>


            <div className="grid gap-2">
              <Label htmlFor="people-count" aria-invalid={peopleCountError ? true : undefined}
              >Number of People </Label>
              <Input
                id="people-count"
                type="number"
                placeholder="10"
                required
                aria-invalid={peopleCountError ? true : undefined}
                inputMode="numeric"
                value={peopleCount}
                onChange={(e) => {
                  const value = e.target.value
                  setPeopleCount(value)
                  setPeopleCountError(validatePeopleCount(value))
                }}
              />
              {peopleCountError ? (
                <p className="text-sm text-destructive">{peopleCountError}</p>
              ) : null}
            </div>


          </div>
        </form>


          <br />

          {billAmount !== "" && tipPercentage !== "" && peopleCount !== "" && !hasErrors && (
            <div className="flex flex-col gap-2">
              <h1>Total Amount: {totalAmount} PKR</h1>
              <h1>Per Person Amount: {perPersonAmount} PKR</h1>
              <h1>Tip Amount: {tipAmount.toFixed(2)} PKR</h1>
            </div>
          )}
      </CardContent>
    </Card>
    </div>
  )
}
