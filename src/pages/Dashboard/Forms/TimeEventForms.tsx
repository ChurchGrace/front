import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectCreateEventStatus,
  selectEventBtnsStatus,
  selectEventPages,
  selectEvents,
  selectEventsError,
  selectEventsStatus,
  updateEventStatus,
} from '../../../app/slices/eventsSlice';
import { createEvent, deleteEvent, getEvents, patchEvent } from '../../../app/thunks/eventsThunk';
import { WithTimeEditForm } from '../../../components/Forms/EditFormGeneral';
import { WithTimeCreateForm } from '../../../components/Forms/CreateFormGeneral';

const TimeEventForms = () => {
  const [page, setPage] = useState(1);
  const events = useAppSelector(selectEvents);
  const formsStatus = useAppSelector(selectEventsStatus);
  const createStatus = useAppSelector(selectCreateEventStatus);
  const btnsStatus = useAppSelector(selectEventBtnsStatus);
  const formError = useAppSelector(selectEventsError);
  const pages = useAppSelector(selectEventPages);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    void dispatch(getEvents({ page, limit: 6 }));
  }, [dispatch, page]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithTimeCreateForm formStatus={createStatus} formError={formError} createThunk={createEvent} />
          {events.map((timeEvent) => {
            return (
              <WithTimeEditForm
                btnsStatus={btnsStatus}
                deleteThunk={deleteEvent}
                changeStatus={updateEventStatus}
                patchThunk={patchEvent}
                formError={formError}
                timeItem={timeEvent.time}
                eventItem={timeEvent.event}
                itemStatus={timeEvent.itemStatus}
                id={timeEvent._id}
                key={timeEvent._id}
              />
            );
          })}
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '30px' }}>
              <PaginationStyled count={pages} page={page} onChange={handleChange} />
            </div>
          )}
        </FormEditorStyled>,
      )}
    </>
  );
};

export default TimeEventForms;
