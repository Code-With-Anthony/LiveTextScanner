"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

type PasswordFieldProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
};

export const PasswordField = ({ form, name, label }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return "Strong";
    return "Moderate";
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <Label>{label}</Label>
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-6"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          {field.name === "confirmPassword" &&
            (() => {
              const strength = getPasswordStrength(field.value);
              return (
                <p className="text-xs text-muted-foreground mt-1">
                  Strength:{" "}
                  <span
                    className={`font-medium ${
                      strength === "Weak"
                        ? "text-red-500"
                        : strength === "Moderate"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {strength}
                  </span>
                </p>
              );
            })()}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
