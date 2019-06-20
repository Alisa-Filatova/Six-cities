import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {withPostComment} from './with-post-comment';
import {ReviewForm} from '../../components/review-form/review-form';

configure({adapter: new Adapter()});

const commentMock = `What an amazing view! The house is stunning and in an amazing location. 
    The large glass wall had an amazing view of the river!`;

describe(`withPostComment`, () => {
  it(`changed state and submit form`, () => {
    const WrappedReviewForm = withPostComment(ReviewForm);
    const postReviewHandler = jest.fn(() => Promise.resolve());
    const form = mount(<WrappedReviewForm postReview={postReviewHandler} offerId={1} />);

    expect(form.state(`comment`)).toEqual(``);
    expect(form.state(`rating`)).toEqual(0);

    const submitBtn = form.find(`.reviews__submit`);
    expect(submitBtn.props().disabled).toEqual(true);

    const ratingStar = form.find(`input.form__rating-input`).first();
    ratingStar.simulate(`change`);
    expect(form.state(`rating`)).toEqual(5);

    const textInput = form.find(`textarea#review`);
    textInput.instance().value = commentMock;
    textInput.simulate(`change`);
    expect(form.state(`comment`)).toEqual(commentMock);

    const updatedSubmitBtn = form.find(`.reviews__submit`);
    expect(updatedSubmitBtn.props().disabled).toEqual(false);

    const reviewForm = form.find(`form.reviews__form`);
    reviewForm.simulate(`submit`);

    expect(postReviewHandler).toHaveBeenCalledTimes(1);
    expect(postReviewHandler).toHaveBeenNthCalledWith(1, {rating: 5, comment: commentMock}, 1);
  });
});