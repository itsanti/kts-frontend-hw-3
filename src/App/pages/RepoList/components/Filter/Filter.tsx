import React, { useState, useCallback } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { REPO_TYPES } from "config/constants";
import { GitHubStore } from "store/GitHubStore";

interface FilterProps {
    className: string;
    store: GitHubStore;
}

const Filter: React.FC<FilterProps> = ({ className, store }) => {
    const [params] = useSearchParams();
    let type: Option | null = null;
    if (REPO_TYPES.includes(params.get('type') as string)) {
        type = { key: params.get('type') as string, value: params.get('type') as string };
    }
    const [value, setValue] = useState<Option[]>(type ? [type] : []);
    const navigate = useNavigate();

    const handleChange = (value: Option[]) => {
        setValue(value.length ? [value[0]] : []);
        const search = params.get('search') || 'ktsstudio';
        const page = params.get('page') || '1';
        const type = value.length ? value[0].key : 'all';
        store.getRepos(search, { page: parseInt(page), per_page: 9, type: type });
        const options = {
            pathname: '/repos/',
            search: `${createSearchParams({ ...Object.fromEntries(params), type: type })}`,
        };
        navigate(options, { replace: true });
    };

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