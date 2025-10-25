import React, { useState, useEffect } from "react";
import Select from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  options: OptionType[];
  value?: OptionType | null;
  handleSelected: (option: OptionType | null) => void;
  isRequired?: boolean;
  width?: "full" | string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default function CustomSelect({
  label = "default label",
  options,
  value = null,
  handleSelected,
  isRequired = false,
  width = "full",
  isLoading = false,
  isDisabled = false,
}: CustomSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    value || options?.[0] || null
  );

  useEffect(() => {
    if (value) setSelectedOption(value);
    else setSelectedOption(options?.[0] || null);
  }, [value, options]);

  const floatLabel =
    isFocused || (!!selectedOption && selectedOption.label.length > 0);

  return (
    <div className={`relative ${width === "full" ? "w-full" : "w-[300px]"} mt-4`}>
      {label && (
        <label
          className={`
            absolute left-2 px-1 text-gray-500 transition-all duration-200 bg-white
            ${floatLabel ? "top-[-7px] text-[12px]" : "top-2 text-sm"}
            z-10
          `}
          onClick={() => setIsFocused(true)}
        >
          {label}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
      )}

      <Select
        className="basic-single"
        classNamePrefix="select"
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          handleSelected(option);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable
        isSearchable
        name="select"
        options={options}
        menuPortalTarget={document.body}
        styles={{
          control: (base, state) => ({
            ...base,
            fontSize: 14,
            boxShadow: "none",
            outline: "none",
            borderColor: state.isFocused ? "#00B795" : base.borderColor,
            "&:hover": { borderColor: "#00B795" },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingTop: 2,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#00B795"
              : state.isFocused
              ? "#BEDBFF"
              : undefined,
            color: state.isSelected ? "white" : "black",
          }),
          singleValue: (base) => ({
            ...base,
            color: "black",
            padding: "2px 6px",
            borderRadius: "5px",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
}
