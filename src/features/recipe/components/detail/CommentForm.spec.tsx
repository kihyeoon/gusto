import { screen } from "@testing-library/react";
import { expect, vi } from "vitest";

import CommentForm from "@/features/recipe/components/detail/CommentForm";

import render from "@/libs/test/render";

it("기본 플레이스 홀더가 노출된다.", async () => {
  await render(<CommentForm onSubmit={() => {}} />);

  const textInput = screen.getByRole("textbox", { name: "글" });

  expect(textInput).toBeInTheDocument();
});

describe("버튼", () => {
  it("기본적으로 버튼이 disabled 상태이다.", async () => {
    await render(<CommentForm onSubmit={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("글을 입력하면 버튼이 enabled 상태가 된다.", async () => {
    const { user } = await render(<CommentForm onSubmit={() => {}} />);

    const textInput = screen.getByRole("textbox", { name: "글" });
    const submitButton = screen.getByRole("button", { name: "글 작성" });

    await user.type(textInput, "test");

    expect(submitButton).toBeEnabled();
  });
});

it("글을 작성하면 작성한 글이 화면에 노출된다.", async () => {
  const { user } = await render(<CommentForm onSubmit={() => {}} />);

  const textInput = screen.getByRole("textbox", { name: "글" });

  await user.type(textInput, "test");

  expect(textInput).toHaveValue("test");
});

it("제출 버튼을 누르면 작성한 글이 전달된다.", async () => {
  const onSubmit = vi.fn();
  const { user } = await render(<CommentForm onSubmit={onSubmit} />);

  const textInput = screen.getByRole("textbox", { name: "글" });
  const submitButton = screen.getByRole("button", { name: "글 작성" });

  await user.type(textInput, "test");
  await user.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith("test");
});
