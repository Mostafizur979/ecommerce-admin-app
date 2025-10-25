import { FiSearch } from "react-icons/fi";
import CustomSelect from "./custom-select";
import CustomButton from "./custom-button";
import { ReactNode } from "react";

interface SelectType {
  label: string;
  value: string;
}

interface FilterPropsType {
  type: string;
  label?: string;
  handleChange: (value: any) => void;
  value: string | SelectType;
  options?: SelectType[];
}

interface ButtonPropsType {
  label: ReactNode;
  handleClick: () => void;
}

interface CustomFilterProps {
  filterProps?: FilterPropsType[];
  buttonProps?: ButtonPropsType[]; 
}

export default function CustomFilter({
  filterProps,
  buttonProps = [], // ✅ Default empty array to prevent undefined errors
}: CustomFilterProps) {
  return (
    <div className="w-full bg-white rounded-md shadow-sm p-2 flex justify-between items-center gap-2 my-2">
      {/* ==== FILTER FIELDS ==== */}
      <div className="flex items-center gap-2">
        {filterProps?.map((data, idx) => (
          <div key={idx}>
            {data.type === "select" ? (
              <div className="text-gray-700 -mt-3.5 w-[350px]">
                <CustomSelect
                  label={data?.label}
                  options={data?.options || []}
                  value={
                    typeof data?.value === "string"
                      ? { label: data.value, value: data.value }
                      : data.value
                  }
                  handleSelected={data?.handleChange}
                />
              </div>
            ) : (
              <div className="text-gray-700 relative">
                <input
                  type="text"
                  name={data.label || "filter"}
                  value={typeof data.value === "string" ? data.value : data.value.value}
                  onChange={(e) => data.handleChange(e.target.value)}
                  style={{ width: 350 }}
                  className="px-2 py-2 border border-gray-300 bg-white text-[14px] rounded-sm focus:outline-0"
                />
                <FiSearch className="text-[20px] absolute top-2 right-2 cursor-pointer" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ==== ACTION BUTTONS ==== */}
      {buttonProps.length > 0 && (
        <div className="flex items-center gap-2">
          {buttonProps.map((data, idx) => (
            <CustomButton key={idx} onClick={data.handleClick}>
                {data.label}
            </CustomButton>
          ))}
        </div>
      )}
    </div>
  );
}
