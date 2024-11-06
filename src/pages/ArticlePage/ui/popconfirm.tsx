import styled from "styled-components"
import { Popconfirm } from "antd"
export const CustomConfirm = styled(Popconfirm)`
  .ant-popover.ant-popover-inner {
    width: 300px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: transparent;
  }

  .ant-popover-inner !important {
    padding: 100px;
    background-color: #d9d9d9;
  }

  .ant-popover-message {
    color: red;
    font-weight: bold;
    background-color: #d9d9d9;
  }
`
