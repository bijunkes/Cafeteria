import React, { useEffect, useState, useRef } from "react";

export function scroll() {
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const atBottom =
                windowHeight + currentScrollY >= documentHeight - 25;

            if (atBottom) {
                setShow(true);
            }
            else if (
                currentScrollY > lastScrollY.current &&
                currentScrollY > 0
            ) {
                setShow(false);
            }
            else if (currentScrollY < lastScrollY.current) {
                setShow(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return show;
}