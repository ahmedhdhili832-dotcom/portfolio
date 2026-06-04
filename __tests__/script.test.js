/**
 * @jest-environment jsdom
 */

const { setFooterYear } = require("../script");

describe("setFooterYear", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  test("sets #year text to the current year", () => {
    document.body.innerHTML = '<span id="year"></span>';
    const result = setFooterYear(document);

    expect(result).toBe(true);
    expect(document.querySelector("#year").textContent).toBe(
      String(new Date().getFullYear())
    );
  });

  test("returns false when #year element is missing", () => {
    document.body.innerHTML = "<p>No year span here</p>";
    const result = setFooterYear(document);

    expect(result).toBe(false);
  });

  test("uses global document when no argument is passed", () => {
    document.body.innerHTML = '<span id="year"></span>';
    const result = setFooterYear();

    expect(result).toBe(true);
    expect(document.querySelector("#year").textContent).toBe(
      String(new Date().getFullYear())
    );
  });

  test("writes a four-digit string", () => {
    document.body.innerHTML = '<span id="year"></span>';
    setFooterYear(document);

    const text = document.querySelector("#year").textContent;
    expect(text).toMatch(/^\d{4}$/);
  });

  test("overwrites existing content in #year", () => {
    document.body.innerHTML = '<span id="year">1999</span>';
    setFooterYear(document);

    expect(document.querySelector("#year").textContent).not.toBe("1999");
    expect(document.querySelector("#year").textContent).toBe(
      String(new Date().getFullYear())
    );
  });

  test("only updates the first matching #year element", () => {
    document.body.innerHTML =
      '<span id="year"></span><span class="year-copy"></span>';
    setFooterYear(document);

    expect(document.querySelector("#year").textContent).toBe(
      String(new Date().getFullYear())
    );
    expect(document.querySelector(".year-copy").textContent).toBe("");
  });

  test("works with a custom document fragment", () => {
    const frag = document.createDocumentFragment();
    const wrapper = document.createElement("div");
    const span = document.createElement("span");
    span.id = "year";
    wrapper.appendChild(span);
    document.body.appendChild(wrapper);

    const result = setFooterYear(document);
    expect(result).toBe(true);
    expect(span.textContent).toBe(String(new Date().getFullYear()));
  });
});
