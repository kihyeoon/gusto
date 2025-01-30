import { useState } from "react";

import { cn } from "@/libs/utils";

/**
 * placeholder 설정 - 테스트 작성 완료
 * className에 따른 css class 설정 - 테스트 작성 완료
 * 텍스트를 입력할 때마다 onChange 핸들러 호출
 * focus 시 border 스타일 변경
 * focus 시 onFocus 핸들러 호출
 * Enter 키 입력 시 onEnter 핸들러 호출
 */
export default function TextField({
  placeholder,
  className,
  onFocus,
  onChange,
  onEnter,
}: {
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const changeValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    onChange?.(ev.target.value);
  };
  const focus = () => {
    setFocused(true);
    onFocus?.();
  };
  const blur = () => {
    setFocused(false);
  };
  const pressEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter" && !ev.nativeEvent.isComposing) {
      ev.preventDefault();
      onEnter?.(value);
    }
  };

  return (
    <input
      type="text"
      className={cn("text-input", className)}
      onChange={changeValue}
      onFocus={focus}
      onBlur={blur}
      onKeyDown={pressEnter}
      placeholder={placeholder || "텍스트를 입력해 주세요."}
      value={value}
      style={
        focused ? { borderWidth: 2, borderColor: "rgb(25, 118, 210)" } : {}
      }
    />
  );
}
