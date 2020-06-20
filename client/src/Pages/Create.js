import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";

import clsx from "clsx";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { findEmpty } from "../Services/functions";
import { NEW_EVENT } from "../Services/GQL/NEW_EVENT";
import { UserContext } from "../userContext";

import Copyright from "src/Atoms/copyright";
import Dropzone from "src/Molecules/Dropzone";
import Spinner from "src/Atoms/Spinner";
import MapCreate from "src/Molecules/MapCreate";
import LoginFirstButton from "src/Atoms/LoginFirstButton";
import CreateView from "./CreateView";

import { useLogicPlusMinusValue } from "./Logic/Create/useLogicPlusMinusValue";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "CZK",
    label: "Kč",
  },
];

function Create(props) {
  let history = useHistory();

  const { context } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState(null);
  const [countOfFiles, setCountOfFiles] = useState(0);
  const Price = useLogicPlusMinusValue("plus_btn", "minus_btn", 50);
  const Capacity = useLogicPlusMinusValue(
    "plus_btn_capacity",
    "minus_btn_capacity",
    15
  );
  const Duration = useLogicPlusMinusValue(
    "plus_btn_duration",
    "minus_btn_duration",
    3
  );
  const [formValue, setFormValue] = useState({
    startDate: new Date(),
    currency: "CZK",
    BYO: true,
    ImagesArr: [],
  });

  const price = Price.value;
  const plusClickPrice = Price.plusClickValue;
  const minusClickPrice = Price.minusClickValue;
  const setNewValuePrice = Price.setNewValue;

  const capacity = Capacity.value;
  const plusClickCapacity = Capacity.plusClickValue;
  const minusClickCapacity = Capacity.minusClickValue;
  const setNewValueCapacity = Capacity.setNewValue;

  const duration = Duration.value;
  const plusClickDuration = Duration.plusClickValue;
  const minusClickDuration = Duration.minusClickValue;
  const setNewValueDuration = Duration.setNewValue;

  const [FeErrors, setFeErrors] = useState([]);
  const [createEvent, { loading, error, data }] = useMutation(NEW_EVENT, {
    onCompleted: () => {
      setFeErrors([]);
    },
  });

  const { dataOut } = data ? data.createEvent : { dataOut: undefined };
  const { errorOut } = data ? data.createEvent : { errorOut: undefined };

  let den = new Date(formValue.startDate);

  //Day +- one day
  const plusDay = () => {
    den.setDate(den.getDate() + 1);
    setFormValue((prev) => {
      return { ...prev, startDate: den };
    });
  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    setFormValue((prev) => {
      return { ...prev, startDate: den };
    });
  };

  //Hours +- one hour
  const plusHour = () => {
    den.setHours(den.getHours() + 1);
    let isoDen = den.toISOString().split(":")[0];
    setFormValue((prev) => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  const minusHour = () => {
    den.setHours(den.getHours() - 1);
    let isoDen = den.toISOString().split(":")[0];
    setFormValue((prev) => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!context._id) {
      history.push("/signin");
    }
  }, []);

  useEffect(() => {
    if (dataOut) {
      setTimeout(() => {
        history.push(`/event/${dataOut._id}`);
      }, 500);
    }
  }, [dataOut]);

  const inputName = useRef(null);
  const inputTime = useRef(null);
  const inputBYO = useRef(null);
  const inputDescription = useRef(null);
  const inputMarker = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let load = {
      name:
        inputName.current && inputName.current.value
          ? inputName.current.value
          : null,
      lng: customMapParam.lng,
      lat: customMapParam.lat,
      address: customMapParam.address,
      author: context._id,
      eventType: 1,
      dateStart: formValue.startDate,
      duration: duration,
      price: price,
      currency: formValue.currency,
      capacityMax: capacity,
      BYO: inputBYO.current.checked,
      description: inputDescription.current.value
        ? inputDescription.current.value
        : null,
      imagesArr: formValue.ImagesArr,
    };

    const empty = findEmpty(load);
    if (empty.length == 0) {
      createEvent({
        variables: load,
      });
    } else {
      setFeErrors(empty);
    }
  };

  const handleDateChange = (date) => {
    setFormValue((prev) => {
      return { ...prev, startDate: date };
    });
  };

  const handleChangeCurrency = (event) => {
    setFormValue((prev) => {
      return { ...prev, currency: event.target.value };
    });
  };

  const handleChangeBYO = () => {
    setFormValue((prev) => {
      return { ...prev, BYO: !formValue.BYO };
    });
  };

  return (
    <CreateView
      formValue={formValue}
      setFormValue={setFormValue}
      handleChangeBYO={handleChangeBYO}
      handleChangeCurrency={handleChangeCurrency}
      handleDateChange={handleDateChange}
      onSubmit={onSubmit}
      minusHour={minusHour}
      plusHour={plusHour}
      minusDay={minusDay}
      plusDay={plusDay}
      inputName={inputName}
      inputTime={inputTime}
      inputBYO={inputBYO}
      inputDescription={inputDescription}
      inputMarker={inputMarker}
      dataOut={dataOut}
      errorOut={errorOut}
      customMapParam={customMapParam}
      setCustomMapParam={setCustomMapParam}
      plusClickCapacity={plusClickCapacity}
      setNewValueCapacity={setNewValueCapacity}
      minusClickDuration={minusClickDuration}
      setNewValueDuration={setNewValueDuration}
      plusClickDuration={plusClickDuration}
      minusClickPrice={minusClickPrice}
      setNewValuePrice={setNewValuePrice}
      plusClickPrice={plusClickPrice}
      minusClickCapacity={minusClickCapacity}
      countOfFiles={countOfFiles}
      loading={loading}
      FeErrors={FeErrors}
      capacity={capacity}
      duration={duration}
      price={price}
      setCountOfFiles={setCountOfFiles}
    />
  );
}

export default Create;
