import {
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Car } from "core/car";
import { useState } from "react";

type CarSetting = {
  label: String;
  value: number;
  onChange: (val: any) => void;
};

const carSettings = (car: Car): CarSetting[] => [
  {
    label: "Max Speed",
    value: car.max_speed,
    onChange: (val) => (car.max_speed = parseInt(val)),
  },
  {
    label: "Power",
    value: car.speed_inc_interval,
    onChange: (val) => (car.speed_inc_interval = parseFloat(val)),
  },
  {
    label: "Turn Speed",
    value: car.turnWheelSpeed,
    onChange: (val) => (car.turnWheelSpeed = parseFloat(val)),
  },
  {
    label: "Car Size",
    value: car.size,
    onChange: (val) => (car.size = parseInt(val)),
  },
];

export default (props: { car: Car }) => {
  const settings = carSettings(props.car);

  settings.forEach((setting) => {
    const [val, setVal] = useState(setting.value);
    setting.value = val;
    const updateObj = setting.onChange;
    setting.onChange = (val) => {
      updateObj(val);
      setVal(val);
    };
  });

  const handleOnChange = (e: any, index: number) => {
    const setting = settings[index];
    const val = e.target.value;
    setting.onChange(val || setting.value);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#404040",
        display: "inline-block",
        position: "relative",
        borderRadius: "0 0 8px 0",
      }}
    >
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
          },
        })}
      >
        <Typography marginBottom={1} variant="h5">
          Car Settings
        </Typography>
        {settings.map((setting, i) => (
          <div key={i}>
            <TextField
              onChange={(e) => handleOnChange(e, i)}
              label={setting.label}
              value={setting.value}
              variant="outlined"
              margin="normal"
              type="number"
            />
          </div>
        ))}
      </ThemeProvider>
    </div>
  );
};
