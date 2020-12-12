import React, { useContext, useState, useRef, useEffect, useMemo } from "react";

import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { findEmpty } from "../Services/functions";
import { NEW_EVENT } from "../Services/GQL/NEW_EVENT";
import { UserContext } from "../Contexts/userContext";

import CreateView from "./CreateView";

import { useLogicPlusMinusValue } from "./Logic/Create/useLogicPlusMinusValue";
import { PLAY_EVENTS_QUERY } from "src/Services/GQL/PLAY_EVENTS_QUERY";

function Create() {
  let history = useHistory();

  const { context } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    setFormValue(prev => {
      return { ...prev, startDate: den };
    });
  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    setFormValue(prev => {
      return { ...prev, startDate: den };
    });
  };

  //Hours +- one hour
  const plusHour = () => {
    den.setHours(den.getHours() + 1);
    let isoDen = den.toISOString().split(":")[0];
    setFormValue(prev => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  const minusHour = () => {
    den.setHours(den.getHours() - 1);
    let isoDen = den.toISOString().split(":")[0];
    setFormValue(prev => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!context._id) {
      history.push({
        pathname: history.location.pathname,
        search: `?signin=true`,
      });
    }
  }, []);

  useEffect(() => {
    if (dataOut) {
      setDialogOpen(true);
    }
  }, [dataOut]);

  useEffect(() => {
    console.log({ formValue });
  }, [formValue]);

  const inputName = useRef(null);
  const inputTime = useRef(null);
  const inputBYO = useRef(null);
  const inputDescription = useRef(null);
  const inputMarker = useRef(null);

  const onSubmit = e => {
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
        refetchQueries: () => [
          {
            query: PLAY_EVENTS_QUERY,
            variables: {
              plusDays: context.playFilterObj.filterOn
                ? context.playFilterObj.plusDays
                : 10000,
              lng: context.playFilterObj.geolocationPlay
                ? context.playFilterObj.geolocationPlay.lng
                : null,
              lat: context.playFilterObj.geolocationPlay
                ? context.playFilterObj.geolocationPlay.lat
                : null,
              radius: context.playFilterObj.filterOn
                ? context.playFilterObj.radius
                : 9999999,
              shownEvents: context.playFilterObj.shownEvents,
            },
          },
        ],
      });
    } else {
      setFeErrors(empty);
    }
  };

  const handleDateChange = date => {
    setFormValue(prev => ({ ...prev, startDate: date }));
  };

  const handleChangeCurrency = event => {
    setFormValue(prev => ({ ...prev, currency: event.target.value }));
  };

  const handleChangeBYO = () => {
    setFormValue(prev => ({ ...prev, BYO: !formValue.BYO }));
  };

  const handleDialogClose = () => {
    setDialogOpen(!dialogOpen);
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
      dialogOpen={dialogOpen}
      handleDialogClose={handleDialogClose}
    />
  );
}

export default Create;
