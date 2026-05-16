
export const getGuestId = () => {
  let guestId = localStorage.getItem("guestId");

  if (!guestId) {
    guestId = "guest_" + Date.now();
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};