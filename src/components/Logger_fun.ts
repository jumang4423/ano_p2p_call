import {His_enum, Log_type} from "../App";

export const get_log_color = (line: Log_type) => {
  switch (line.type) {
    case His_enum.info:
      return "white";
    case His_enum.success:
      return "green";
    case His_enum.warning:
      return "orange";
    case His_enum.error:
      return "red";
    default:
      return "white";
  }
}
