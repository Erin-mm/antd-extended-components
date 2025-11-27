import { Table } from "antd";

export default ({
  dataSource,
}: {
  dataSource: {
    prop: string;
    description: string;
    type: string;
    defaultValue: string;
    version: string;
  }[];
}) => {
  const columns = [
    {
      title: "参数",
      dataIndex: "prop",
      key: "prop",
    },
    {
      title: "说明",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <div style={{ color: "#c41d7f" }}>{type}</div>,
    },
    {
      title: "默认值",
      dataIndex: "defaultValue",
      key: "defaultValue",
      width: 150,
    },
    {
      title: "版本",
      dataIndex: "version",
      key: "version",
      width: 100,
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
};
