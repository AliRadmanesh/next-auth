import { SendOtpRequestDTO } from "@/types/dtos/otp";
import { showCredit } from "@/services/urls";

export const sendOtpViaSms = ({ mobile }: SendOtpRequestDTO) => {
  return new Promise((resolve, reject) => {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ mobile }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        apikey: "v30w_YtR2p7Oo4_5eT9b1HP_tBeGrcBFKqX68AdPrcs=",
      },
    })
      .then((res) => {
        res
          .json()
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};

export const checkCredit = () => {
  return new Promise((resolve, reject) => {
    fetch(showCredit, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        apikey: "v30w_YtR2p7Oo4_5eT9b1HP_tBeGrcBFKqX68AdPrcs=",
      },
    })
      .then((res) => {
        res
          .json()
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};
