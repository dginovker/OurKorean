import React from "react";
import { useParams } from "react-router-dom";
import Keyboard from "./keyboard";

export default function Help() {
    const { article } = useParams();

    if (article === "keyboard") {
        return <Keyboard />;
    }
}