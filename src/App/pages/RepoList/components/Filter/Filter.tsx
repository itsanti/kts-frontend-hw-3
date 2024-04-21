import React, { useState, useCallback } from "react";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { REPO_TYPES } from "config/constants";

interface FilterProps {
    className: string;
}

const Filter: React.FC<FilterProps> = ({ className }) => {
    const [value, setValue] = useState<Option[]>([]);

    const handleChange = useCallback((value: Option[]) => setValue(value.length ? [value[0]] : []), []);
    const handleTitle = useCallback((values: Option[]) => value.length < 1 ? "Type" : values.map(({ value }) => value).join(', '), [value]);

    return (
        <MultiDropdown
            options={REPO_TYPES.map(t => ({ key: t, value: t }))}
            value={value}
            onChange={handleChange}
            getTitle={handleTitle}
            className={className}
        />
    );
}

export default Filter;