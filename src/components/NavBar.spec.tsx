import { screen } from "@testing-library/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Mock, expect, vi } from "vitest";

import render from "@/libs/test/render";

import NavBar from "./NavBar";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  useSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockUsePathname = usePathname as Mock;

describe("NavBar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  describe("로그인하지 않은 경우", () => {
    beforeEach(() => {
      (useSession as Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
    });

    it("로그인 버튼이 보인다", async () => {
      await render(<NavBar />);

      const loginButton = screen.getByRole("button", { name: "로그인" });
      expect(loginButton).toBeInTheDocument();
    });

    it("로그인 버튼을 클릭하면 로그인 함수가 호출된다", async () => {
      const { user } = await render(<NavBar />);

      const loginButton = screen.getByRole("button", { name: "로그인" });
      await user.click(loginButton);

      expect(signIn).toHaveBeenCalled();
    });
  });

  describe("로그인한 경우", () => {
    beforeEach(() => {
      (useSession as Mock).mockReturnValue({
        data: {
          user: {
            id: "1",
            username: "test",
            name: "Test User",
            email: "test@example.com",
            image: "test.jpg",
          },
        },
        status: "authenticated",
      });
    });

    it("마이페이지 메뉴가 보인다", async () => {
      await render(<NavBar />);

      const myPageMenu = screen.getByText("마이페이지");
      expect(myPageMenu).toBeInTheDocument();
    });

    it("마이페이지를 클릭하고 로그아웃을 확인하면 로그아웃 함수가 호출된다", async () => {
      const { user } = await render(<NavBar />);

      const myPageButton = screen.getByText("마이페이지");
      await user.click(myPageButton);

      const confirmButton = await screen.findByRole("button", { name: "네" });
      await user.click(confirmButton);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe("로그인 페이지인 경우", () => {
    beforeEach(() => {
      mockUsePathname.mockReturnValue("/auth/signIn");
    });

    it("네비게이션 바가 렌더링되지 않는다", async () => {
      await render(<NavBar />);

      const nav = screen.queryByRole("navigation");
      expect(nav).not.toBeInTheDocument();
    });
  });
});
