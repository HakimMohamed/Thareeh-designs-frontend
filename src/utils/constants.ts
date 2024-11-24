export const constants: {
  readonly PAGE_SIZE: number;
  readonly ROUTES_REQUIRE_MODAL_OPEN: {
    [route: string]: "GET" | "POST" | "PUT" | "DELETE";
  };
} = {
  PAGE_SIZE: 12,
  ROUTES_REQUIRE_MODAL_OPEN: {
    "/api/cart": "POST",
  },
};
