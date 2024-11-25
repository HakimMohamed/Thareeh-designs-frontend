export const constants: {
  readonly PAGE_SIZE: number;
  readonly ROUTES_REQUIRE_MODAL_OPEN: {
    [route: string]: "get" | "post" | "put" | "delete";
  };
} = {
  PAGE_SIZE: 12,
  ROUTES_REQUIRE_MODAL_OPEN: {
    "/api/cart": "post",
    "/api/cart/item": "post",
  },
};
