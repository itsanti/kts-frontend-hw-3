import React, { useState } from "react";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { REPO_TYPES } from "config/constants";

interface FilterProps {
    className: string;
}

const Filter: React.FC<FilterProps> = ({ className }) => {
    const [value, setValue] = useState<Option[]>([]);
    return (
        <MultiDropdown
            options={REPO_TYPES.map(t => ({ key: t, value: t }))}
            value={value}
            onChange={(value) => setValue(value.length ? [value[0]] : [])}
            getTitle={(values) => value.length < 1 ? "Type" : values.map(({ value }) => value).join(', ')}
            className={className}
        />
    );
}

export default Filter;