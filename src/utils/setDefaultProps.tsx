import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { PageContainer, ProTable, ProTableProps } from '@ant-design/pro-components';
import {
  Collapse,
  DatePicker,
  Empty,
  Image,
  ImageProps,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  Pagination,
  Select,
  SelectProps,
  Spin,
  message,
} from 'antd';
import dayjs from 'dayjs';

type TComponent<C, P> = C & { defaultProps: P };

(Image as TComponent<typeof Image, ImageProps>).defaultProps = {
  preview: false,
  draggable: false,
  placeholder: true,
};

(Input as TComponent<typeof Input, any>).defaultProps = {
  //   maxLength: 32,
};

(Input.TextArea as TComponent<typeof Input.TextArea, any>).defaultProps = {
  //   maxLength: 64,
};

(Spin as TComponent<typeof Spin, any>).defaultProps = {
  delay: 200,
};

(Collapse as TComponent<typeof Collapse, any>).defaultProps = {
  expandIconPosition: 'end',
  expandIcon: ({ isActive }) => (isActive ? <CaretDownOutlined /> : <CaretRightOutlined />),
};

(InputNumber as TComponent<typeof InputNumber, InputNumberProps>).defaultProps = {
  min: 0,
  precision: 2,
  controls: false,
  max: Math.pow(10, 8),
};

(Modal as TComponent<typeof Modal, any>).defaultProps = {
  centered: true,
  maskClosable: false,
  destroyOnClose: true,
};

(DatePicker as TComponent<typeof DatePicker, any>).defaultProps = {
  disabledDate: (current: dayjs.Dayjs) => current.isAfter(),
};

const messageConfig = {
  top: 100,
  maxCount: 2,
  duration: 1.5,
};
message.config(messageConfig);

(Empty as TComponent<typeof Empty, any>).defaultProps = {
  image: Empty.PRESENTED_IMAGE_SIMPLE,
};

(Select as TComponent<typeof Select, SelectProps>).defaultProps = {
  // showSearch: true,
  maxTagCount: 'responsive',
};

(Pagination as TComponent<typeof Pagination, any>).defaultProps = {
  showSizeChanger: true,
};

(PageContainer as TComponent<typeof PageContainer, any>).defaultProps = {
  breadcrumbRender: false,
};

(ProTable as TComponent<typeof ProTable, ProTableProps<object, object>>).defaultProps = {
  rowKey: 'id',
  tableAlertRender: false,
  scroll: { x: 'max-content' },
  search: { defaultCollapsed: false },
};
