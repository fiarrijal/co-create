import React from "react";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Row, Col, Tabs } from "antd";
// import ProjectCollapse from "../ProjectCollapse";
import TableArticleHome from "components/Table/TableArticleHome";
import TableProjectHome from "components/Table/TableProjectHome";

const { TabPane } = Tabs;

function ArticleContent() {
	const callback = (key) => {
		console.log(key);
	};

	return (
		<div>
			<Row>
				<Col span={24}>
					<Tabs defaultActiveKey="1" onChange={callback}>
						<TabPane
							tab={
								<span>
									<MailOutlined /> Article
								</span>
							}
							key="1"
						>
							<TableArticleHome />
						</TabPane>
						<TabPane
							tab={
								<span>
									<AppstoreOutlined /> Project
								</span>
							}
							key="2"
						>
							{/* <ProjectCollapse /> */}
							<TableProjectHome />
						</TabPane>
					</Tabs>
				</Col>
			</Row>
		</div>
	);
}

export default ArticleContent;
