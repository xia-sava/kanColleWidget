import React, { Component } from "react";
import chomex, { Client } from "chomex";

import DeckCapture from "../../Models/DeckCapture";
import SideBar from "./SideBar";
import SettingModal from "./SettingModal";
import Composer from "./Composer";

// FIXME: このstateの構造、汚すぎでは？
// eslint-disable-next-line @typescript-eslint/ban-types
export default class DeckCaptureView extends Component<{}, {
  selected:  DeckCapture;  // 現在選択されている設定
  settings: DeckCapture[]; // 選択可能なせってい一覧
  row; col; page: number;
  preview: string;
  open: boolean;
}> {

  private client: chomex.Client = new Client(chrome.runtime);

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(props: Readonly<{}>) {
    super(props);
    const setting: DeckCapture = DeckCapture.find("normal");
    this.state = {
      selected: setting,
      settings: DeckCapture.list(),
      row: setting.row,
      col: setting.col,
      page: setting.page,
      preview: null,
      open: false,
    };
  }

  async componentDidMount(): Promise<void> {
    // サイドバーにpreviewを表示したい
    const { uri } = await this.client.message("/capture/screenshot", { open: false });
    this.setState({ preview: uri });
  }

  render(): JSX.Element {
    const {
      settings,
      selected,
      preview,
      row, col, page,
      open,
    } = this.state;
    return (
      <div className="container root">
        <div className="columns root">
          <div className="column col-3">
            <SideBar
              settings={settings}
              selected={selected}
              onSelect={ev => this.onSettingChange(ev)}
              preview={preview}
              row={row}
              col={col}
              page={page}
            />
            <SettingModal active={open} />
          </div>
          <div className="column col-9">
            <Composer setting={selected} />
          </div>
        </div>
      </div>
    );
  }
  private onSettingChange(ev) {
    const selected = DeckCapture.find<DeckCapture>(ev.target.value);
    this.setState({
      selected,
      row:  selected.row,
      col:  selected.col,
      page: selected.page,
    });
  }
}
