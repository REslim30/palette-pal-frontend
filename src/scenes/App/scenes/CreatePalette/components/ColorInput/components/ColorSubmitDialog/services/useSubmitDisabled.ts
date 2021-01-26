import React, {useEffect, useState} from "react";

export default function useSubmitDisabled(name: string, shades: string[]) {
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setSubmitDisabled(shades.length <= 0 || !name);
  }, [shades.length, name]);

  return submitDisabled;
};