import React, { useEffect, useMemo, useState } from "react";
import {
	Breadcrumb,
	Button,
	Result,
} from "antd";
import type { TableColumnsType } from "antd";
import { Content } from "antd/lib/layout/layout";

const Util404Page: React.FC = () => {

	return (
		<>
			<Breadcrumb
				items={[{ title: 'Inicio' }, { title: '404' }]}
				className='my-4 text-2xl font-semibold'
			/>
			<Content className="p-4 m-0 bg-white rounded-lg border border-solid border-neutral-200">

				<Result
					status="404"
					title="404"
					subTitle="Desculpe, a página que você visitou não existe."
					extra={<Button type="primary" href="/">Voltar</Button>}
				/>

			</Content>
			
		</>
	);
}

export default Util404Page;