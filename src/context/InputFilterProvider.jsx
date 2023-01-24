import PropTypes from 'prop-types';
import useHandleFilter from '../hooks/useHandleFilter';
import InputFilterContext from './InputFilterContext';

export default function InputFilterProvider({ children }) {
  const {
    text,
    handleChange,
    dataFiltered, loading, options, setOptions, filterByOptions, optionsList,
    filters, clearFilters, resetFilters, sortedFilters,
    setCol, setSor } = useHandleFilter('');

  return (
    <InputFilterContext.Provider
      value={ {
        text,
        handleChange,
        dataFiltered,
        loading,
        options,
        setOptions,
        filterByOptions,
        optionsList,
        filters,
        clearFilters,
        resetFilters,
        sortedFilters,
        setCol,
        setSor,
      } }
    >
      { children }
    </InputFilterContext.Provider>
  );
}

InputFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
