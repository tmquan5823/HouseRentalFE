import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function RoomListHeader({ sortBy, onSortChange }) {
  return (
    <>
      <div className="d-flex text-dark border-bottom align-items-center">
        <div className="col-2">メイン写真</div>

        <div className="col flex-grow-1 d-flex align-items-center">
          部屋番号 / タイプ / 間取り / 建物名 / 
          <span className="ms-2">ID</span>
          <button
            className="btn btn-link p-0 ms-1"
            onClick={() => onSortChange(sortBy === "id_asc" ? "id_desc" : "id_asc")}
          >
            {sortBy === "id_asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>
          /
          <span className="ms-2">住所</span>
        </div>

        <div className="col-2 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center">
            短期価格
            <button
              className="btn btn-link p-0 ms-1"
              onClick={() => onSortChange(sortBy === "shortPrice_asc" ? "shortPrice_desc" : "shortPrice_asc")}
            >
              {sortBy === "shortPrice_asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>
          <span className="mx-2">|</span> 
          <div className="d-flex align-items-center">
            中期価格
            <button
              className="btn btn-link p-0 ms-1"
              onClick={() => onSortChange(sortBy === "middlePrice_asc" ? "middlePrice_desc" : "middlePrice_asc")}
            >
              {sortBy === "middlePrice_asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>
        </div>

        <div className="col-1 text-center">状況</div>
        <div className="col-1 text-center">操作</div>
      </div>
      <hr className="m-0" />
    </>
  );
}
