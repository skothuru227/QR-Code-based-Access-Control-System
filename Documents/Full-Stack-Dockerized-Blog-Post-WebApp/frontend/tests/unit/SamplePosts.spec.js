import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import SamplePosts from '@/components/SamplePosts.vue';
import {baseUrl} from '@/constants/constants';
import {fetchMock} from '../fetch-mock';

const samplePost = {
  content: 'sample-post-3',
  id: 1
};
const posts = [
  {
    id: 1,
    content: 'sample-post-1'
  }, 
  {
    id: 2,
    content: 'sample-post-2'
  }
];

describe('SamplePosts.vue', () => {
  // jest hook called before each test to ensure fetch reqeusts are mocked
  beforeEach(() => {
    fetchMock
    .get(`${baseUrl}get_posts`, {
      code: 200,
      posts: posts
    })
    .post(`${baseUrl}create_post`, {
      code: 200,
      post: samplePost
    });
  });
  it('checks for form-row', () => {
    const wrapper = shallowMount(SamplePosts)
    expect(wrapper.find('.form-row').exists()).toBe(true);
  });
  it('checks for post getting created', async ()=>{
    const wrapper = shallowMount(SamplePosts);
    wrapper.setData({
      postContent: samplePost.content
    });
    wrapper.find('form').trigger('submit'); //simulate form submit
    await flushPromises(); //flush all pending promises
    expect(wrapper.vm.posts.length).toEqual(3); //post gets added to posts array
    await wrapper.vm.$forceUpdate(); //force component to update to test changes to dom
    expect(wrapper.findAll('.post').length).toEqual(3); //test new dom element added
  });
})
