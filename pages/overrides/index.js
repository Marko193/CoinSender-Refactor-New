import { merge } from "lodash";
import Card from "./Card";
import Tabs from "./Tabs";
import Lists from "./Lists";
import Paper from "./Paper";
import Input from "./Input";
import Button from "./Button";
import Tooltip from "./Tooltip";
import Backdrop from "./Backdrop";
import Typography from "./Typography";
import IconButton from "./IconButton";
import HelperText from "./HelperText";
import Autocomplete from "./Autocomplete";

export default function ComponentsOverrides(theme) {
  return merge(
    Card(theme),
    Tabs(theme),
    Lists(theme),
    Paper(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme),
    Autocomplete(theme),
    HelperText(theme)
  );
}
