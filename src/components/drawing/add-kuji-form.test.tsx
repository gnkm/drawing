import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddKujiForm } from "./add-kuji-form";

function renderForm(props: { onAdd?: (label: string) => void } = {}) {
  const onAdd = props.onAdd ?? vi.fn();
  const view = render(<AddKujiForm onAdd={onAdd} />);
  return { onAdd, ...view };
}

describe("AddKujiForm", () => {
  it("入力が空のとき追加ボタンを disabled にする", () => {
    renderForm();
    expect(screen.getByRole("button", { name: "くじを追加" })).toBeDisabled();
  });

  it("空白のみのとき追加ボタンを disabled にする", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText("くじの内容"), {
      target: { value: "   " },
    });
    expect(screen.getByRole("button", { name: "くじを追加" })).toBeDisabled();
  });

  it("21文字以上のとき追加ボタンを disabled にする", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText("くじの内容"), {
      target: { value: "a".repeat(21) },
    });
    expect(screen.getByRole("button", { name: "くじを追加" })).toBeDisabled();
  });

  it("有効な入力で submit すると onAdd が呼ばれ入力がクリアされる", () => {
    const { onAdd } = renderForm();
    const input = screen.getByLabelText("くじの内容");

    fireEvent.change(input, { target: { value: "  A賞  " } });
    fireEvent.click(screen.getByRole("button", { name: "くじを追加" }));

    expect(onAdd).toHaveBeenCalledOnce();
    expect(onAdd).toHaveBeenCalledWith("A賞");
    expect(input).toHaveValue("");
  });

  it("親が key を変えるとフォームがリセットされる", () => {
    const onAdd = vi.fn();
    const { rerender } = render(<AddKujiForm key={0} onAdd={onAdd} />);
    const input = screen.getByLabelText("くじの内容");

    fireEvent.change(input, { target: { value: "テスト" } });
    expect(input).toHaveValue("テスト");

    rerender(<AddKujiForm key={1} onAdd={onAdd} />);
    expect(screen.getByLabelText("くじの内容")).toHaveValue("");
  });
});
