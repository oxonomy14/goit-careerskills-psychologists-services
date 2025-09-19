import Select, { components } from 'react-select';
import css from './Dropdown.module.css';

const DropdownIndicator = props => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <span className={css.iconWrapper}>
        {menuIsOpen ? (
          <svg className={css.iconChevron} width={12} height={8}>
            <use href={`/icons/chevron.svg#icon-chevron-up`}></use>
          </svg>
        ) : (
          <svg className={css.iconChevron} width={12} height={8}>
            <use href={`/icons/chevron.svg#icon-chevron-down`}></use>
          </svg>
        )}
      </span>
    </components.DropdownIndicator>
  );
};

const customStyles = {
  control: base => ({
    ...base,
    backgroundColor: 'var(--primary-color)',
    borderRadius: '14px',
    border: 'none',
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    width: '226px',
    height: '48px',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': { borderColor: 'var(--primary-color)' },
  }),

  //menu list
option: (base, state) => {
  const isFirst = state.data.value === 'aToZ'; 
  return {
    ...base,
    backgroundColor: state.isSelected ? '#fff' : '#fff',
    color: isFirst ? 'var(--text-strong)' : 'rgba(25, 26, 21, 0.3)',
    cursor: 'pointer',
  };
},
  menuList: base => ({
    ...base,

    minHeight: '216px',

    overflowY: 'none',
   

  }),
  valueContainer: base => ({
  ...base,
    flex: 1,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
}),
  singleValue: base => ({
    ...base,
   flex: 1,  
    fontWeight: '400',
    fontFamily: 'var(--font-family)',
    color: 'var(--bg-main-color)',
    lineHeight: '1.25',
    display: 'flex',
    alignItems: 'center',  
   margin: 0,         
    padding: 0,
  }),
  menu: base => ({
    ...base,
    maxWidth: '226px',
    minWidth: '226px',
    borderRadius: '14px',
    overflow: 'hidden',
    boxShadow: '0 20px 69px 0 rgba(0, 0, 0, 0.07)',
    backgroundColor: '#fff',
   padding: '14px 18px',
    zIndex: 10,
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  placeholder: base => ({
    ...base,
    flex: 1,  
    color: 'var(--bg-main-color)',
    fontWeight: 400,
    margin: 0,         
    padding: 0,
  }),
};

const options = [
  { value: 'aToZ', label: 'A to Z' },
  { value: 'zToA', label: 'Z to A' },
  { value: 'less10', label: 'Less than 10$' },
  { value: 'greater10', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'notPopular', label: 'Not popular' },
  { value: 'all', label: 'Show all' },
];

const Dropdown = ({ onChangeFilter, activeFilter }) => {
  const handleChange = selectedOption => {
    // передаємо просто значення (рядок)
    onChangeFilter(selectedOption.value);
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Filter"
      isSearchable={false}
      value={options.find(opt => opt.value === activeFilter)} // синхронізація
      defaultValue={options.find(opt => opt.value === 'Show all')}
      onChange={handleChange}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
    />
  );
};

export default Dropdown;
