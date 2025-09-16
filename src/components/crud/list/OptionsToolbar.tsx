import React, { useMemo, useState } from "react";
import { Input, Popover, Checkbox, Button, Divider, Typography, Space, Flex } from "antd";
import { FilterOutlined, MenuOutlined, TableOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Text } = Typography;

export default function OptionsToolbar() {
  // Estados locais apenas para exemplo
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total] = useState(42);
  const [searchValue, setSearchValue] = useState("");
  const [columns, setColumns] = useState([
    { key: "name", label: "Nome", visible: true },
    { key: "age", label: "Idade", visible: true },
    { key: "address", label: "Endereço", visible: true },
  ]);

  const pageSizeOptions = [10, 20, 50, 100];

  const from = useMemo(() => (total === 0 ? 0 : (currentPage - 1) * pageSize + 1), [currentPage, pageSize, total]);
  const to = useMemo(() => Math.min(currentPage * pageSize, total), [currentPage, pageSize, total]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / Math.max(1, pageSize))), [total, pageSize]);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const handlePrev = () => {
    if (canPrev) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (canNext) setCurrentPage(currentPage + 1);
  };

  const paginationPopover = (
    <div className="min-w-[220px]">
      <Text strong>Items por página</Text>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {pageSizeOptions.map((opt) => (
          <Button
            key={opt}
            type={pageSize === opt ? "primary" : "default"}
            size="small"
            className="!rounded-lg"
            onClick={() => setPageSize(opt)}
          >
            {opt}
          </Button>
        ))}
			</div>
			
			<Divider className="my-3" />

			<Flex justify="space-between" align="center">

      <Space>
        <Text type="secondary">Página</Text>
        <Text>
          {currentPage} / {totalPages}
        </Text>
				</Space>
				
      <Space>
        <Button type="text" onClick={handlePrev} disabled={!canPrev}>
          {"<"}
        </Button>
        <Button type="text" onClick={handleNext} disabled={!canNext}>
          {">"}
        </Button>
				</Space>

			</Flex>

    </div>
  );

  const filtersPopover = (
    <div className="min-w-[240px]">
      <Text strong className="block mb-2">Filtros</Text>
      <Space direction="vertical" className="w-full">
        <Checkbox checked>Todos</Checkbox>
        <Checkbox>Somente ativos</Checkbox>
        <Checkbox>Com alerta</Checkbox>
      </Space>
    </div>
  );

  const columnsPopover = (
    <div className="min-w-[220px]">
      <Text strong>Colunas visíveis</Text>
      <div className="mt-2 flex flex-col gap-1">
        {columns.map((col) => (
          <Checkbox
            key={col.key}
            checked={col.visible}
            onChange={(e) =>
              setColumns((prev) =>
                prev.map((c) =>
                  c.key === col.key ? { ...c, visible: e.target.checked } : c
                )
              )
            }
          >
            {col.label}
          </Checkbox>
        ))}
      </div>
      <Divider className="my-3" />
      <Text type="secondary" className="text-xs">
        Dica: desmarque colunas para ocultá-las.
      </Text>
    </div>
  );

  return (
    <div className="w-full flex flex-wrap items-center gap-2 justify-between pb-4">

        <Search
          allowClear
          placeholder="Pesquisar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={(v) => console.log("Pesquisar:", v)}
          className="w-[220px]"
          enterButton
        />
      {/* Direita: Search, Filtros, Colunas */}
      <div className="flex items-center gap-2">
      {/* Esquerda: Paginação */}
      <Space size={4} className="items-center">

        <Popover content={paginationPopover} trigger={["click"]} placement="bottomLeft">
          <Button type="text" className="!px-2">
            {`${from}-${to} de ${total}`}
          </Button>
        </Popover>

        <Button type="text" onClick={handlePrev} disabled={!canPrev} className="!px-2">
          {"<"}
        </Button>
        <Button type="text" onClick={handleNext} disabled={!canNext} className="!px-2">
          {">"}
        </Button>
      </Space>

        <Popover trigger={["click"]} placement="bottomRight" content={filtersPopover}>
					<Button color="default" variant="text" className="!px-2" title="Filtros" icon={<FilterOutlined />}>
						Todos
          </Button>
        </Popover>

        <Popover trigger={["click"]} placement="bottomRight" content={columnsPopover}>
          <Button color="default" variant="text" className="!px-2" title="Colunas" icon={<TableOutlined />} />
        </Popover>
      </div>
    </div>
  );
}
