import React, { Fragment } from "react";
import { connect } from "react-redux";

import "./ItemsList.css";

import * as actions from "../../store/actions";

import ListControls from "./ListControls/ListControls";
import Item from "./Item/Item";

const ItemsList = (props) => {
  let itemsValues;

  props.incomeVersion
    ? (itemsValues = props.incomeData)
    : (itemsValues = props.expenseData);

  const items = itemsValues.map((item, index) => {
    return (
      <Item
        key={item.itemName + index}
        itemId={index + 1}
        itemName={item.itemName}
        amount={item.amount}
        date={item.date}
        category={item.category}
        itemEdited={(e) => props.editItem(index, e)}
        clicked={() => props.showDescriptionInfo(index)}
        togglePopup={(e) => props.toggleDeletePopup(e, index)}
      />
    );
  });

  return (
    <Fragment>
      <section className="itemList__container">
        <ListControls total={props.totalAmount} />
        <section className="itemList__tags">
          <span>Id</span>
          <span>Nombre</span>
          <span>Cantidad</span>
          <span>Fecha</span>
          {props.incomeVersion ? null : <span>Categoria</span>}
          <span></span>
        </section>
        {itemsValues.length >= 1 ? (
          items
        ) : (
          <p className="itemList__empty">
            No hay registros
            <span role="img" aria-label="astronaut">
              👨‍🚀
            </span>
          </p>
        )}
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    incomeData: state.form.incomeData,
    expenseData: state.form.expenseData,
    incomeVersion: state.form.incomeVersion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editItem: (index, event) => dispatch(actions.editItem(index, event)),
    toggleDeletePopup: (e, index) =>
      dispatch(actions.toggleDeletePopup(e, index)),
    showDescriptionInfo: (index) =>
      dispatch(actions.showDescriptionInfo(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
