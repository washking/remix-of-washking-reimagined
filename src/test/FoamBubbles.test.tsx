import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FoamBubbles from "@/components/FoamBubbles";

describe("FoamBubbles hydration", () => {
  it("hydrates its SSG markup without recoverable errors", async () => {
    const markup = renderToString(
      <FoamBubbles variant="hero" density="medium" />,
    );
    const container = document.createElement("div");
    const recoverableErrors: unknown[] = [];
    let root: Root;

    expect(markup).not.toContain("<style");
    container.innerHTML = markup;
    document.body.appendChild(container);

    await act(async () => {
      root = hydrateRoot(
        container,
        <FoamBubbles variant="hero" density="medium" />,
        {
          onRecoverableError: (error) => recoverableErrors.push(error),
        },
      );
    });

    expect(recoverableErrors).toEqual([]);
    expect(container.querySelectorAll(".foam-bubble")).toHaveLength(5);

    await act(async () => root.unmount());
    container.remove();
  });
});
