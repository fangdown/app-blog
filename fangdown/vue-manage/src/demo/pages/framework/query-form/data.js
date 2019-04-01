const arr = [
  {
    $show: true,
    columnName: 'pointName',
    columnType: 'string',
    label: '文本框',
    operation: 'contain',
    placeholder: '',
    propertyName: 'pointName',
    required: false,
    show: true,
    span: 3,
    type: 'text',
    width: '128px',
  },
  {
    $show: true,
    columnName: 'loadingTime',
    columnType: 'date',
    dateType: 'daterange',
    format: 'yyyy-MM-dd',
    label: '时间',
    operation: 'equal',
    placeholder: '',
    propertyName: 'loadingTime',
    required: false,
    show: true,
    span: 6,
    type: 'datePicker',
    valueFormat: 'yyyy-MM-dd',
    width: '168px',
  },
  {
    $show: true,
    columnName: 'creatorName',
    columnType: 'string',
    label: '文本框',
    operation: 'contain',
    placeholder: '',
    propertyName: 'creatorName',
    required: false,
    show: true,
    span: 3,
    type: 'text',
    width: '86px',
  },
  {
    $show: true,
    columnName: 'type',
    columnType: 'enum',
    label: '下拉列表',
    lookupCode: 'ecs_car_list_type',
    operation: 'contain',
    options: [
      {
        label: '干线',
        value: '200',
      },
      {
        label: '取派',
        value: '300',
      }
    ],
    placeholder: '',
    propertyName: 'type',
    required: false,
    show: true,
    span: 3,
    type: 'select',
    unNull: true,
    width: '70px',
  }
]
export default arr